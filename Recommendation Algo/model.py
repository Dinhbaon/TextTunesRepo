from nltk.stem.porter import PorterStemmer
from nltk.corpus import stopwords
import pickle

def text_processing(text):
    text = [porter.stem(word) for word in text.split()]
    text_filter = [word for word in text if word not in stop]
    return text_filter

def get_songs(similar_documents, index_dictionary):
    return [index_dictionary[docs[0]][0] for docs in similar_documents]

def get_artists(similar_documents, index_dictionary):
    return [index_dictionary[docs[0]][1] for docs in similar_documents]

if __name__ == "__main__":
    filename_model = 'finalized_model.sav'
    filename_index = 'index_dictionary.sav'
    TOP_RECOMMENDATIONS = 5
    input_text = ""
    model = pickle.load(open(filename_model, 'rb'))
    index_dictionary = pickle.load(open(filename_index, 'rb'))

    porter = PorterStemmer()
    stop = stopwords.words('english')


    input_text = text_processing(input_text)
    new_doc_vector = model.infer_vector(input_text)
    similar_documents = model.dv.most_similar(new_doc_vector, topn=TOP_RECOMMENDATIONS)

    

