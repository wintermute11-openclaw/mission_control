import imaplib

IMAP_HOST = 'imap.gmail.com'
IMAP_PORT = 993
USERNAME = 'wintermuteclaw@gmail.com'
PASSWORD = 'sadj yvyl ghwl vdyk'

try:
    mail = imaplib.IMAP4_SSL(IMAP_HOST, IMAP_PORT)
    mail.login(USERNAME, PASSWORD)
    print('Login erfolgreich!')
    mail.logout()
except Exception as e:
    print(f'Fehler beim Login: {e}')
