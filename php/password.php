<?php

/*
    Sources:
        https://secure.php.net/manual/en/reference.pcre.pattern.syntax.php
        https://stackoverflow.com/questions/8251426/insert-string-at-specified-position
        https://stackoverflow.com/questions/6159683/read-each-line-of-txt-file-to-new-array-element

    Word list .txt file from:
        http://www.mieliestronk.com/corncob_lowercase.txt
*/

// Randomly select between scraping a word list from http://www.paulnoll.com or using the word list file from http://www.mieliestronk.com
function getWordList() {
    $type = rand(0, 2);
    if ($type === 1) {
        $regex = "/<li>(.*?)<\/li>/s";
        $result = array();
        for ($i = 1; $i < 30; $i = $i + 2) {
            if ($i < 9) {
                $scrape = file_get_contents("http://www.paulnoll.com/Books/Clear-English/words-" . "0" . $i . "-" . "0" . ($i + 1) . "-hundred.html");
            } elseif ($i === 9) {
                $scrape = file_get_contents("http://www.paulnoll.com/Books/Clear-English/words-09-10-hundred.html");
            } else {
                $scrape = file_get_contents("http://www.paulnoll.com/Books/Clear-English/words-" . $i . "-" . ($i + 1) . "-hundred.html");
            }
            preg_match_all($regex, $scrape, $list);
            for ($j = 0; $j < count($list[1]); $j++) {
                $item = str_replace(array('"', "'", "."), "", $list[1][$j]);
                $result[] = $item = preg_replace("/\s+/", "", $item);
            }
        }
        return $result; 
    } else {
        return explode("\n", file_get_contents("words.txt"));
    }
}

// Assemble the base array of words to use.
function getBaseWords() {
    $base = getWordList();
    $base_length = count($base) - 1;
    $list = array();
    for ($i = 0; $i < $_POST["quantity-words"]; $i++) {
        $list[] = str_replace(array("\n", "\r"), "", $base[rand(0, $base_length)]);
    }
    return $list;
}

// Set the case of the words to all uppercase, all lowercase, or first letter capitalized.
function setWordCase($list) {
    for ($i = 0; $i < $_POST["quantity-words"]; $i++) {
        $item = $list[$i];
        if ($_POST["include-lowercase"] === "true") { $item = strtolower($item); }
        if ($_POST["include-uppercase"] === "true") { $item = strtoupper($item); }
        if ($_POST["include-capitalized"] === "true") { $item = ucfirst($item); }
        $list[$i] = $item;
    }
    return $list;
}

// Set the word spacer to hypens, underscores, or blank spaces.
function getWordSpacer() {
    if ($_POST["include-hyphens"] === "true") { return "-"; }
    if ($_POST["include-underscores"] === "true") { return "_"; }
    if ($_POST["include-spaces"] === "true") { return " "; }
    return "-";
}

// Helper function to insert a number or special character before, after or inside a word.
function insertIntoString($item, $insert) {
    $position = rand(0, 2);
    if ($position === 2) {
        $item = substr_replace($item, $insert, rand(0, strlen($item) - 1), 0);
    } elseif ($position === 1) {
        $item = $item . $insert;
    } else {
        $item = $insert . $item;
    }
    return $item;
}

// Add numbers to the password.
function addNumbers($list) {
    for ($i = 0; $i < $_POST["quantity-numbers"]; $i++) {
        $random_word = rand(0, $_POST["quantity-words"] - 1);
        $item = $list[$random_word];
        $item = insertIntoString($item, rand(0, 9));
        $list[$random_word] = $item;
    }
    return $list;
}

// Add special characters to the password.
function addSpecial($list) {
    $specials = array(",", ".", "!", "@", "#", "$", "%", "~", "&", "(", ")", "?", "+", "=", "[", "]");
    for ($i = 0; $i < $_POST["quantity-special"]; $i++) {
        $random_word = rand(0, $_POST["quantity-words"] - 1);
        $item = $list[$random_word];
        $item = insertIntoString($item, $specials[rand(0, 15)]);
        $list[$random_word] = $item;
    }
    return $list;
}

// After the words have been processed, assemble them into the password string.
function assemblePassword($list) {
    $length = $_POST["quantity-words"] - 1;
    $pw = "";
    $spacer = getWordSpacer();
    for ($i = 0; $i < $length; $i++) {
        $item = $list[$i];
        $pw = $pw . $item . $spacer;
    }
    $pw = $pw . $list[$length];
    return base64_encode($pw);
}

// Main function to create a password.
function createPassword() {
    $list = getBaseWords();
    $list = setWordCase($list);
    if ($_POST["include-numbers"] === "true") { $list = addNumbers($list); }
    if ($_POST["include-special"] === "true") { $list = addSpecial($list); }
    header("Content-Type: application/json");
    echo json_encode(array("password" => assemblePassword($list)));
}

// Call the main function to create a password.
createPassword();

?>