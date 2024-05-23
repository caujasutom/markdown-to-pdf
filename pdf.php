<?php

require_once __DIR__ . '/vendor/autoload.php';
use Mpdf\Mpdf;

header('X-Content-Type-Options: nosniff');
header('Content-Type: application/pdf');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    die('Method Not Allowed');
}

$content = file_get_contents('php://input');
if (empty($content)) {
    http_response_code(400);
    echo "No content provided.";
    exit;
}

$stylesheet = file_get_contents('pdf.css');

$mpdf = new Mpdf();
$mpdf->WriteHTML($stylesheet, \Mpdf\HTMLParserMode::HEADER_CSS);
$mpdf->WriteHTML($content, \Mpdf\HTMLParserMode::HTML_BODY);

$mpdf->Output();