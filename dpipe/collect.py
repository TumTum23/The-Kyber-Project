from datetime import datetime
import json
import logging

import newspaper

logger = logging.getLogger(__name__)

def enable_log(log_name):
    """ Enable logs written to file """
    logging.basicConfig(filename= log_name, level=logging.INFO, format='%(asctime)s %(levelname)s %(message)s')

def process_article(article):
    doc = {}
    doc['url'] = article.url

    try:
        article.download()

        article.parse()
        article.nlp()

        doc['authors'] = article.authors
        doc['publish_date'] = str(article.publish_date)
        doc['text'] = article.text
        doc['keywords'] = article.keywords
        doc['error'] = 0

    except Exeption as exc:
        doc['error'] = str(exc)
        logger.error("Unable to download. {}".format(article.url))

    return doc

def identify_articles(newspaper_urls:list, keywords:set):
    """ Identify any articles containing keywords in urls. """
    for newsurl in newspaper_urls:
        
        try:
            paper = newspaper.build(newsurl)
        except Exception as exc:
            logger.error("Unable to build. {}".format(newsurl))
            logger.exception(exc)

        for article in paper.articles:

            logger.info("article url. {}".format(article.url))
            for keyword in keywords:

                if keyword in article.url:
                    logger.info("{} in {}".format(keyword, article.url))
                    yield process_article(article)

def store_articles(fpath:str, newspaper_urls:list, keywords:set):

    dailies = []
    for proc in identify_articles(newspaper_urls, keywords):

        dailies.append(proc)
        logger.info("Processed. {}".format(proc['url']))

    with open(fpath, "w") as f:
        json.dump(dailies, f)
        logger.info("Wrote out. {}".format(fpath))

if __name__ == "__main__":

    dt = datetime.now()
    fpath = "/Users/tylerbrown/Downloads/articles/daily_articles_{}-{}-{}.json".format(dt.year, dt.month, dt.day)
    newspaper_urls = [
        "http://www.cnn.com",
        "http://www.foxnews.com",
        "http://www.nytimes.com"
    ]
    keywords = set(['trump','biden'])
    
    enable_log("daily_articles.log")
    store_articles(fpath, newspaper_urls, keywords)
