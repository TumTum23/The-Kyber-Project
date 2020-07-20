import json
import re

from lxml import html
import requests

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
        print(cand)
        if cand in majt:

            tt[cand] = []

            if cand != current:
                current = cand

        if cand in mint:

            tt[current].append(cand)

    return tt

def output_candidates(urls:list) -> dict:
    
    output = {}
    for url in urls:

        r = requests.get(url)
        if r.status_code == requests.codes.ok:
            tree = html.fromstring(r.content)
            topics = orient_topics(tree)

            output[url] = topics

        else:
            print("bad status code. {}. {}".format(r.status_code, url))

    return output


if __name__ == "__main__":

    urls = [
        "https://en.wikipedia.org/wiki/Political_positions_of_Joe_Biden",
        "https://en.wikipedia.org/wiki/Political_positions_of_Kamala_Harris",
        "https://en.wikipedia.org/wiki/Political_positions_of_Donald_Trump",
        "https://en.wikipedia.org/wiki/Political_positions_of_the_2020_Democratic_Party_presidential_primary_candidates",
    ]
    output = output_candidates(urls)

    with open("candidate_topics_20200719.json", "w") as outfile:
        json.dump(output, outfile)
