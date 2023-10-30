<?php

class Base extends Controller {
    public function index() {
        echo 'Home/index';
    }

    public function about($id) {
        echo 'Home/about/' . $id;
    }
}