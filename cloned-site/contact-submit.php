<?php
declare(strict_types=1);

function redirect_to(string $path): never
{
    header('Location: ' . $path);
    exit;
}

$redirectBase = '/contact-us/';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirect_to($redirectBase);
}

function clean_value(string $value): string
{
    $value = trim($value);
    $value = preg_replace("/[\r\n]+/", ' ', $value);
    return strip_tags($value);
}

$honeypot = $_POST['website'] ?? '';
if (trim((string) $honeypot) !== '') {
    redirect_to($redirectBase . '?sent=1');
}

$name = clean_value((string) ($_POST['name'] ?? ''));
$email = filter_var(trim((string) ($_POST['email'] ?? '')), FILTER_VALIDATE_EMAIL);
$company = clean_value((string) ($_POST['company'] ?? ''));
$country = clean_value((string) ($_POST['country'] ?? ''));
$help = trim((string) ($_POST['help'] ?? ''));
$help = strip_tags($help);

if ($name === '' || $email === false || $company === '' || $country === '' || $help === '') {
    redirect_to($redirectBase . '?error=1');
}

$to = 'info@crestlinepromotion.com';
$subject = 'New Crestline Website Inquiry from ' . $name;

$messageLines = [
    'A new inquiry was submitted through the Crestline website contact form.',
    '',
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
    redirect_to($redirectBase . '?sent=1');
}

redirect_to($redirectBase . '?error=1');
