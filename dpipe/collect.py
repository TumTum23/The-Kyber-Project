from datetime import datetime
import logging

import newspaper

logger = logging.getLogger(__name__)

def enable_log(log_name):
    """ Enable logs written to file """
    logging.basicConfig(filename= log_name, level=logging.INFO, format='%(asctime)s %(levelname)s %(message)s')

def identify_articles(newspaper_urls:list, keywords:set):
    """ Identify any articles containing keywords in urls. """
    for newsurl in newspaper_urls:
        
        paper = newspaper.build(newsurl)

        keypaper = []
        for article in paper.articles:

            for keyword in keywords:

                if keyword in article.url:
                    yield article

def process_article(article):
    doc = {}
    doc['url'] = article.url

    article.download()
    article.parse()
    article.nlp()

    doc['authors'] = article.authors
    doc['publish_date'] = str(article.publish_date)
    doc['text'] = article.text
    doc['keywords'] = article.keywords

    return doc

def store_articles(fpath:str, newspaper_urls:list, keywords:set):

    dailies = []
    for article in identify_articles(newspaper_urls, keywords):

        parsed = process_article(article)
        dailies.append(parsed)
        logger.info("Processed. {}".format(article.url))

    with open(fpath, "w") as f:
        json.dump(dailies, f)
        logger.info("Wrote out. {}".format(fpath))

if __name__ == "__main__":

    dt = datetime.now()
    fpath = "/Users/tylerbrown/Downloads/articles/daily_articles_{}-{}-{}.json".format(dt.year, dt.month, dt.day)
    newspaper_urls = [
        "https://www.cnn.com/",
        "https://www.foxnews.com/",
        "https://www.nytimes.com/"
    ]
    keywords = set(['trump','biden'])
    
    enable_log("collect_daily_articles.log")
    store_articles(fpath, newspaper_urls, keywords)
