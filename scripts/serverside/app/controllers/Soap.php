<?php

class SoapHandler
{
    private $url;
    private $api_key;

    public function __construct()
    {
        $this->url = "http://host.docker.internal:6060/api";
        $this->api_key = "3aebff22-3c5f-41f4-ac16-059c8be926d9";
    }

    public function call($method, $params)
    {
        // The XML data to send
        $xmlData = $this->buildXMLBody($method, $params);
        // echo $xmlData;
        // Initialize cURL session
        $ch = curl_init($this->url);

        // Set cURL options for POST request
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $xmlData);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: text/xml', // Set appropriate content-type for XML
            'api-key: ' . $this->api_key,
        ));

        // Execute the cURL session
        $response = curl_exec($ch);

        // Check for errors
        if (curl_errno($ch)) {
            echo 'Request Error:' . curl_error($ch);
        }

        // Close cURL session
        curl_close($ch);

        // Use the API response
        $response = $this->parseXML($response);
        return $response['S_Body']['ns2_' . $method . 'Response']['return'];
    }

    private function buildXMLBody($method, $params)
    {
        $method = $this->buildXMLMethod($method, $params);
        return '
    <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
        ' . $method . '
        </Body>
    </Envelope>';
    }

    private function buildXMLMethod($method, $params)
    {
        if (!(isset($params))) {
            $params = '';
        } else {
            $params = $this->buildXMLParams($params);
        }
        return '<' . $method . ' xmlns="http://service/">' . $params  . '</' . $method . '>';
    }

    private function buildXMLParams($params)
    {
        $res =  '';
        foreach ($params as $index => $value) {
            // Escape special XML characters in the value
            $escapedValue = htmlspecialchars($value, ENT_XML1, 'UTF-8');
            // Construct the element
            $res .= "<arg{$index} xmlns=\"\">{$escapedValue}</arg{$index}>\n";
        }
        return $res;
    }

    private function parseXML($xml)
    {
        $xml = trim($xml);
        $obj = SimpleXML_Load_String($xml);
        $nss = $obj->getNamespaces(true);


        $nsm = array_keys($nss);
        foreach ($nsm as $key) {
            // A REGULAR EXPRESSION TO MUNG THE XML
            $rgx
                = '#'               // REGEX DELIMITER
                . '('               // GROUP PATTERN 1
                . '\<'              // LOCATE A LEFT WICKET
                . '/?'              // MAYBE FOLLOWED BY A SLASH
                . preg_quote($key)  // THE NAMESPACE
                . ')'               // END GROUP PATTERN
                . '('               // GROUP PATTERN 2
                . ':{1}'            // A COLON (EXACTLY ONE)
                . ')'               // END GROUP PATTERN
                . '#'               // REGEX DELIMITER
            ;
            // INSERT THE UNDERSCORE INTO THE TAG NAME
            $rep
                = '$1'          // BACKREFERENCE TO GROUP 1
                . '_'           // LITERAL UNDERSCORE IN PLACE OF GROUP 2
            ;
            // PERFORM THE REPLACEMENT
            $xml =  preg_replace($rgx, $rep, $xml);
        }

        return json_decode(json_encode(SimpleXML_Load_String($xml, 'SimpleXMLElement', LIBXML_NOCDATA)), true);
    }
}

class Soap extends Controller
{
    private $soapHandler;

    public function __construct()
    {
        require_once __DIR__ . '/../applications/response.php';
        require_once __DIR__ . '/../constants/response.php';
        $this->soapHandler = new SoapHandler();
    }

    public function testConnection()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            if (!(isset($_POST['arg0']))) {
                json_response_fail(WRONG_API_CALL);
                return;
            }
            $response = $this->soapHandler->call("TestConnection", array(
                '0' => $_POST['arg0'],
            ));
            json_response_success($response);
        } else {
            json_response_fail(METHOD_NOT_ALLOWED);
        }
    }

    public function getApiKey()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $response = $this->soapHandler->call("getApiKey", []);
            json_response_success($response);
        } else {
            json_response_fail(METHOD_NOT_ALLOWED);
        }
    }

    public function getLogs()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $response = $this->soapHandler->call("getAllLog", []);
            json_response_success($response);
        } else {
            json_response_fail(METHOD_NOT_ALLOWED);
        }
    }
    public function cobacurl()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {

            // The API endpoint you want to call
            $url = 'http://host.docker.internal:6060/api';

            // The XML data to send
            $xmlData = '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
        <TestConnection xmlns="http://service/">
        <arg0 xmlns="">[string?]</arg0>
    </TestConnection>
        </Body>
    </Envelope>';

            // Initialize cURL session
            $ch = curl_init($url);

            // Set cURL options for POST request
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $xmlData);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-Type: text/xml', // Set appropriate content-type for XML
            ));

            // Execute the cURL session
            $response = curl_exec($ch);

            // Check for errors
            if (curl_errno($ch)) {
                echo 'Request Error:' . curl_error($ch);
            }

            // Close cURL session
            curl_close($ch);

            // Use the API response
            json_response_success($response);
        } else {
            json_response_fail(METHOD_NOT_ALLOWED);
        }
    }
}
