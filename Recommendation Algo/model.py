from nltk.stem.porter import PorterStemmer
from nltk.corpus import stopwords

import pickle

filename = 'finalized_model.sav'
TOP_RECOMMENDATIONS = 5
input_text = "The koala (Phascolarctos cinereus), sometimes called the koala bear, is an arboreal herbivorous marsupial native to Australia. It is the only extant representative of the family Phascolarctidae and its closest living relatives are the wombats. The koala is found in coastal areas of the mainland's eastern and southern regions, inhabiting Queensland, New South Wales, Victoria, and South Australia. It is easily recognisable by its stout, tailless body and large head with round, fluffy ears and large, dark nose. The koala has a body length of 60–85 cm (24–33 in) and weighs 4–15 kg (9–33 lb). Fur colour ranges from silver grey to chocolate brown. Koalas from the northern populations are typically smaller and lighter in colour than their counterparts further south. These populations possibly are separate subspecies, but this is disputed."
model = pickle.load(open(filename, 'rb'))

porter = PorterStemmer()
stop = stopwords.words('english')

def text_processing(text : str) -> str:
    text = [porter.stem(word) for word in text.split()]
    text_filter = [word for word in text if word not in stop]
    return text_filter


input_text = text_processing(input_text)
new_doc_vector = model.infer_vector(input_text)
similar_documents = model.dv.most_similar(new_doc_vector, topn=TOP_RECOMMENDATIONS)
print(similar_documents)
