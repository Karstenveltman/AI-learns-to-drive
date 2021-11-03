function Lineintersection_t(x1, y1, x2, y2, x3, y3, x4, y4) {
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    return(t)
}

function Lineintersection_u(x1, y1, x2, y2, x3, y3, x4, y4) {
    const u = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    return(u)
}