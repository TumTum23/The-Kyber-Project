from itertools import combinations

def extract_values(top_level:list):
    """ We only want to compare lower level topics. """
    low_level = []
    for v in top_level:
        low_level.extend(v)
    return low_level

def jaccard(d:dict, r=2):
    """ Find the jaccard distance for all possible combinations. 

    Rough measure to assess coverage of similar topics across candidates.
    """
    sim = []
    for cand0, cand1 in list(combinations(d.keys(),r)):

        c0 = set(extract_values(d[cand0]))
        c1 = set(extract_values(d[cand1]))

        sim.append((cand0, cand1, len(c0 & c1) / len(c0 | c1), len(c0 | c1)))

    return sim
