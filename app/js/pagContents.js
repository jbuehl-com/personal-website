
export function getPageContents(p, classes) {
    var pageContents = [];

    for (var i = 0; i <= p.length; ++i) {
        pageContents[i] = p.eq([i]).find(classes); 
    }
    return pageContents;
}
