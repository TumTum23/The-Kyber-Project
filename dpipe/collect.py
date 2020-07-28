from datetime import datetime
import json
import os
import re
import logging
from urllib.parse import urljoin

from lxml import html
import requests

logger = logging.getLogger(__name__)

def parse_topic_titles(tree:html.HtmlElement) -> list:
    return tree.xpath('//span[@class="toctext"]/text()') 

def parse_major_topics(tree:html.HtmlElement) -> list:
    return tree.xpath('//h2/span[@class="mw-headline"]/text()')

def parse_minor_topics(tree:html.HtmlElement) -> list:
    return tree.xpath('//h3/span[@class="mw-headline"]/text()') 

def orient_topics(tree:html.HtmlElement) -> dict:
    titles = parse_topic_titles(tree)
    majt = parse_major_topics(tree)
    mint = parse_minor_topics(tree)

    if len(titles) == 0 or len(majt) == 0 or len(mint) == 0:
        return {}

    tt = {}
    current = majt[0]
    majt = set(majt)
    mint = set(mint)
    for cand in titles:
        logger.info(cand)
        if cand in majt:

            tt[cand] = []

            if cand != current:
                current = cand

        if cand in mint:

            tt[current].append(cand)

    return tt

def cache_or_fetch(url:str, fpath:str):

    if os.path.exists(fpath):
        with open(fpath, "rb") as f:
            r_content = f.read()
        tree = html.fromstring(r_content)
        return 0, tree

    r = requests.get(url)
    if r.status_code == requests.codes.ok:
       
        with open(fpath, "wb") as f:
            f.write(r.content)

        tree = html.fromstring(r.content)
        return 0, tree

    return r.status_code, ""

def output_candidates(urls:list, cachedir:str) -> dict:
    
    output = {}
    for url in urls:

        logger.info("Processing. {}".format(url))
        fname = url.split("/")[-1]
        dt = "{}{}".format(datetime.now().year, datetime.now().month)
        fname += dt
        fpath = urljoin(cachedir, fname)

        errcode, tree = cache_or_fetch(url, fpath)
        if errcode == 0:

            topics = orient_topics(tree)
            output[url] = topics

        else:
            logger.error("bad status code. {}. {}".format(errcode, url))

    return output


if __name__ == "__main__":

    cachedir = "/Users/tylerbrown/Downloads/wiki/"
    urls = [
        "https://en.wikipedia.org/wiki/Political_positions_of_Joe_Biden",
        "https://en.wikipedia.org/wiki/Political_positions_of_Kamala_Harris",
        "https://en.wikipedia.org/wiki/Political_positions_of_Donald_Trump",
        "https://en.wikipedia.org/wiki/Political_positions_of_the_2020_Democratic_Party_presidential_primary_candidates",
    ]
    output = output_candidates(urls, cachedir)
    op = "candidate_topics_{}{}.json".format(datetime.now().year, datetime.now().month)
    outpath = urljoin(cachedir, op)
    with open(outpath, "w") as outfile:
        json.dump(output, outfile)
