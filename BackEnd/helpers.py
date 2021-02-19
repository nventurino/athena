import csv
import pandas as pd
import numpy as np

word_matrix = pd.read_csv('Data/emotion-words-matrix.csv')
emotions = word_matrix.columns.values[1:]

#Takes in word matrix and creates mapping from keyword to emotion and magnitude
def create_word_mapping(df):
    word_mapping = {}
    magnitude = df.iloc[:,0]
    emotions = df.columns.values[1:]
    for i in range(0, df.shape[0]-1):
        for j in range(1, df.shape[1]):
            if pd.isna(df.iloc[i,j]): continue
            if magnitude[i] == "mild":
                magnitude_int = 0
            elif magnitude[i] == "medium":
                magnitude_int = 1
            elif magnitude[i] == "strong":
                magnitude_int = 2
            else:
                raise Exception("magnitude was not expected value")
            word_mapping[df.iloc[i,j].lower()] = {
                "magnitude": magnitude[i],
                "emotion": emotions[j-1],
            }
    return word_mapping
word_map = create_word_mapping(word_matrix)

#Detects the emotions present and the magnitude of each emotion
#Degrees of magnitude (3) is hardcoded
def detect_emotion_and_magnitude(transcript, word_map, emotions):
    emotion_dict = {}
    for emotion in emotions:
        emotion_dict[emotion] = {
        'mild': 0,
        'medium': 0,
        'strong': 0
    }
    for word in transcript:
        if word in word_map.keys():
            magnitude = word_map[word]['magnitude']
            emotion = word_map[word]['emotion']
            emotion_dict[emotion][magnitude] += 1
    return emotion_dict
