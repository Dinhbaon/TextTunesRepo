import json
import shlex
import subprocess
from nltk.stem.porter import PorterStemmer
import nltk
import pickle
nltk.data.path.append("/tmp")
nltk.download("stopwords", download_dir="/tmp")
from nltk.corpus import stopwords

def lambda_handler(event, context):

    filename = 'finalized_model.sav'

    # subprocess.check_output(shlex.split("cp finalized_model.sav /tmp"))
    # subprocess.check_output(shlex.split("/bin/chmod 777 /tmp/finalized_model.sav"))
    TOP_RECOMMENDATIONS = 5
    input_text = json.loads(event["body"])['message']
    model = pickle.load(open(filename, 'rb'))
    porter = PorterStemmer()
    stop = stopwords.words('english')
    
    def text_processing(text: str) -> str:
        text = [porter.stem(word) for word in text.split()]
        text_filter = [word for word in text if word not in stop]
        return text_filter


    input_text = text_processing(input_text)
    new_doc_vector = model.infer_vector(input_text)
    similar_documents = model.dv.most_similar(
        new_doc_vector, topn=TOP_RECOMMENDATIONS)
    print(similar_documents)
    recommendations = []
    recommendations = []
    for songs in similar_documents:
        song_id = songs[0]
        strength = songs[1]
        recommendations.append({
            'song_id': song_id,
            'strength': strength
        })
    return {
        "statusCode": 200,
        "body": json.dumps(
            {
                "recommendations": recommendations,
            }
        ),
    }
