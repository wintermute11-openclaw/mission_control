import smtplib
from email.mime.text import MIMEText

SMTP_HOST = 'smtp.gmail.com'
SMTP_PORT = 587
USERNAME = 'wintermuteclaw@gmail.com'
PASSWORD = 'sadj yvyl ghwl vdyk'

def send_test_email():
    msg = MIMEText('Dies ist eine Testmail von Wintermute über dein Gmail SMTP mit TLS.\n\nGrüße, Wintermute.')
    msg['Subject'] = 'Testmail von Wintermute'
    msg['From'] = USERNAME
    msg['To'] = USERNAME

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
        server.starttls()
        server.login(USERNAME, PASSWORD)
        server.sendmail(USERNAME, USERNAME, msg.as_string())
    print('Testmail erfolgreich gesendet.')

if __name__ == '__main__':
    try:
        send_test_email()
    except Exception as e:
        print(f'Fehler beim Senden der Testmail: {e}')
