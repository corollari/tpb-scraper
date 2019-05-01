while read m; do
  qbt torrent add url $m
done < magnets
