from itertools import combinations

def extract_values(d:dict):
    """ We only want to compare lower level topics. """
    h = [] 
    for k in d.keys(): 
        s = [] 
        for j,v in d[k].items(): 
            s.extend(v) 
        h.append((k, set(s)))
    return h

def jaccard(d:dict, r=2):
    """ Find the jaccard distance for all possible combinations. 

    Rough measure to assess coverage of similar topics across candidates.
    """
    k = []
    h = extract_values(d)
    for m,n in combinations([i for i in range(len(h))], r):
        k.append((h[m][0], h[n][0], len(h[m][1] & h[n][1]) / len(h[m][1] | h[n][1])))
    return k
