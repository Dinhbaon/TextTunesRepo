from nltk.stem.porter import PorterStemmer
from nltk.corpus import stopwords
import pickle

filename = 'finalized_model.sav'
TOP_RECOMMENDATIONS = 5
input_text = ""
model = pickle.load(open(filename, 'rb'))

porter = PorterStemmer()
stop = stopwords.words('english')

def text_processing(text):
    text = [porter.stem(word) for word in text.split()]
    text_filter = [word for word in text if word not in stop]
    return text_filter


input_text = text_processing(input_text)
new_doc_vector = model.infer_vector(input_text)
similar_documents = model.dv.most_similar(new_doc_vector, topn=TOP_RECOMMENDATIONS)
