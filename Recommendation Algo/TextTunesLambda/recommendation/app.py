import json
from nltk.stem.porter import PorterStemmer
from nltk.corpus import stopwords
import nltk
nltk.download('stopwords')
import pickle


def lambda_handler(event, context):
    """Sample pure Lambda function

    Parameters
    ----------
    event: dict, required
        API Gateway Lambda Proxy Input Format

        Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format

    context: object, required
        Lambda Context runtime methods and attributes

        Context doc: https://docs.aws.amazon.com/lambda/latest/dg/python-context-object.html

    Returns
    ------
    API Gateway Lambda Proxy Output Format: dict

        Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
    """


    filename = '/tmp/finalized_model.sav'
    TOP_RECOMMENDATIONS = 5
    input_text = event['message']
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
    return {
        "statusCode": 200,
        "body": json.dumps(
            {
                "recommendations": similar_documents,
            }
        ),
    }
