<?php
declare(strict_types=1);

function redirect_to(string $path): never
{
    header('Location: ' . $path);
    exit;
}

function wants_json_response(): bool
{
    $requestedWith = strtolower((string) ($_SERVER['HTTP_X_REQUESTED_WITH'] ?? ''));
    $accept = strtolower((string) ($_SERVER['HTTP_ACCEPT'] ?? ''));

    return $requestedWith === 'xmlhttprequest' || str_contains($accept, 'application/json');
}

function finish_request(bool $ok, string $redirectPath, string $message, int $statusCode = 200): never
{
    if (wants_json_response()) {
        http_response_code($statusCode);
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode([
            'ok' => $ok,
            'message' => $message,
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        exit;
    }

    redirect_to($redirectPath);
}

$redirectBase = '/contact-us/';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    finish_request(false, $redirectBase, 'Invalid request method.', 405);
}

function clean_value(string $value): string
{
    $value = trim($value);
    $value = preg_replace("/[\r\n]+/", ' ', $value);
    return strip_tags($value);
}

$honeypot = $_POST['website'] ?? '';
if (trim((string) $honeypot) !== '') {
    finish_request(true, $redirectBase . '?sent=1', 'Your inquiry has been sent successfully.');
}

$name = clean_value((string) ($_POST['name'] ?? ''));
$email = filter_var(trim((string) ($_POST['email'] ?? '')), FILTER_VALIDATE_EMAIL);
$company = clean_value((string) ($_POST['company'] ?? ''));
$country = clean_value((string) ($_POST['country'] ?? ''));
$help = trim((string) ($_POST['help'] ?? ''));
$help = strip_tags($help);
$source = clean_value((string) ($_POST['source'] ?? 'Website Inquiry'));

if ($name === '' || $email === false || $company === '' || $country === '' || $help === '') {
    finish_request(false, $redirectBase . '?error=1', 'Please complete all required fields before submitting.', 422);
}

$to = 'info@crestlinepromotion.com';
$subject = 'New Crestline Website Inquiry from ' . $name;

$messageLines = [
    'A new inquiry was submitted through the Crestline website contact form.',
    '',
    'Source: ' . $source,
    'Name: ' . $name,
    'Email: ' . $email,
    'Company / Brand: ' . $company,
    'Country / Market: ' . $country,
    '',
    'Inquiry Details:',
    $help,
];

$message = implode(PHP_EOL, $messageLines);

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: Crestline Website <info@crestlinepromotion.com>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
];

$sent = mail($to, $subject, $message, implode("\r\n", $headers));

if ($sent) {
    finish_request(true, $redirectBase . '?sent=1', 'Your inquiry has been sent successfully.');
}

finish_request(false, $redirectBase . '?error=1', 'We could not send your inquiry right now. Please try again.', 500);
