risky_words = ['worthless', 'miserable', 'useless', 'terrified', 'hopeless', 'panicked', 'panic', 'disgust', 'humiliating', 'disgusting', 'terrifying',
'horrible', 'powerless', 'desolate', 'rattled', 'petrified', 'depressed', 'ashamed', 'disgusted', 'overwhelmed', 'crushed', 'humiliated', 'ashamed', 
'kill', 'killing', 'killed', 'die', 'death', 'murder', 'disappear', 'heaven', 'hell']


def check_for_keywords(sentence, word_list):
    nugget = False
    for word in sentence:
        if word in word_list:
            nugget = True
    return nugget


def detect_nuggets(items):
    global risky_words
    sentences = []
    sentence = []
    nuggets = []
    nugget_positions = []
    nugget_moments = []
    for item in items:
        if item['type'] == 'punctuation':
            sentences.append(sentence)
            nugget = check_for_keywords(sentence, risky_words)
            if nugget:
                nuggets.append(sentence)
                nugget_positions.append(len(sentences)-1)
            sentence = []
        else:
            sentence.append(item['alternatives'][0]['content'].lower())
    if len(nuggets):
        for i in range(len(nuggets)):
            sentence_pos = nugget_positions[i]
            context = []
            try:
                context.append(sentences[(sentence_pos - 2)])
            except:
                pass
            try:
                context.append(sentences[(sentence_pos - 1)])
            except:
                pass
            context.append(nuggets[i])
            try:
                context.append(sentences[(sentence_pos + 1)])
            except:
                pass
            try:
                context.append(sentences[(sentence_pos + 2)])
            except:
                pass
            important_utterance = {
                'utterance': nuggets[i],
                'context': context,
            }
            nugget_moments.append(important_utterance)
    return nugget_moments

