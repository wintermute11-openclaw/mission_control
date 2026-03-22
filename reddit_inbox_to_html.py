import praw
import html
from datetime import datetime

CLIENT_ID = 'deine_client_id'
CLIENT_SECRET = 'dein_client_secret'
USERNAME = 'dein_reddit_username'
PASSWORD = 'dein_passwort'
USER_AGENT = 'reddit-inbox-html-script by /u/dein_reddit_username'

reddit = praw.Reddit(client_id=CLIENT_ID,
                     client_secret=CLIENT_SECRET,
                     username=USERNAME,
                     password=PASSWORD,
                     user_agent=USER_AGENT)

def format_timestamp(utc_timestamp):
    return datetime.utcfromtimestamp(utc_timestamp).strftime('%Y-%m-%d %H:%M:%S')

def fetch_inbox_messages():
    messages = []
    for message in reddit.inbox.all(limit=None):
        if isinstance(message, praw.models.Message):
            messages.append(message)
    return messages

def generate_html(messages):
    html_content = '''
    <html>
    <head>
    <style>
    body { font-family: Arial, sans-serif; background: #ece5dd; padding: 20px; }
    .message-container { max-width: 600px; margin: 0 auto; }
    .message { padding: 10px 15px; border-radius: 10px; margin-bottom: 10px; width: fit-content; max-width: 80%; }
    .from-me { background: #dcf8c6; margin-left: auto; text-align: right; }
    .from-them { background: white; margin-right: auto; text-align: left; }
    .timestamp { font-size: 0.75em; color: gray; margin-top: 5px; }
    </style>
    </head>
    <body>
    <div class="message-container">
    '''

    for msg in messages:
        author = msg.author.name if msg.author else '[deleted]'
        from_me = (author.lower() == USERNAME.lower())
        css_class = 'from-me' if from_me else 'from-them'
        safe_body = html.escape(msg.body)
        timestamp = format_timestamp(msg.created_utc)

        html_content += f'''
        <div class="message {css_class}">
            <div>{safe_body.replace("\n", "<br>")}</div>
            <div class="timestamp">{author} | {timestamp}</div>
        </div>
        '''

    html_content += '''
    </div>
    </body>
    </html>
    '''
    return html_content

if __name__ == '__main__':
    messages = fetch_inbox_messages()
    html_output = generate_html(messages)
    with open('reddit_inbox.html', 'w', encoding='utf-8') as f:
        f.write(html_output)
    print('reddit_inbox.html wurde erstellt.')
