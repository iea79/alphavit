<?php
if ((isset($_POST['name']) && $_POST['name'] != "")) { //Проверка отправилось ли наше поля name и не пустые ли они
    $to = 'busforward@gmail.com, sav.sobol@ya.ru'; //Почта получателя, через запятую можно указать сколько угодно адресов
    $subject = 'Заявка с сайта';
    $message = '
    <html>
        <head>
            <title>' . $subject . '</title>
        </head>
        <body>
            <h2>Название формы: ' . $subject . '</h2>
            <p>Предмет лизинга: ' . $_POST['type'] . '</p>
            <p>Телефон: ' . $_POST['tel'] . '</p>
            <p>Контактное лицо: ' . $_POST['name'] . '</p>
            <p>E-mail: ' . $_POST['email'] . '</p>
            <p>ИНН: ' . $_POST['inn'] . '</p>
            <p>Стоимость: ' . $_POST['price'] . '</p>
            <p>Колличество: ' . $_POST['count'] . '</p>
            <p>Аванс: ' . $_POST['avans'] . '</p>
            <p>Дополнительная информация: ' . $_POST['info'] . '</p>
        </body>
    </html>';
    $headers = "Content-type: text/html; charset=utf-8 \r\n"; //Кодировка письма
    $headers .= "From: Лизинговое агенство АЛФАВИТ <info>\r\n"; //Наименование и почта отправителя
    if (mail($to, $subject, $message, $headers)) {
        echo 'success';
    } else {
        echo 'error';
    }
}?>
