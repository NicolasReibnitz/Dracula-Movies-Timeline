#!/bin/bash

# HTML=$(curl "https://www.imdb.com/list/ls520749027/" 2>/dev/null)
HTML=$(cat imdb.html)
HTML_NO_BREAKS=$(echo "$HTML" | awk '{ printf "%s", $0 }' | sed 's/</\n</g')
IMAGES=$(echo "$HTML" | grep -o https://m.media-amazon.com/images/M/.\*\.jpg | sed -e 's/_V1_.*/_V1_.jpg/g')
YEARS=$(echo "$HTML" | grep 'lister-item-year' | sed -e 's/.*(//g' -e 's/).*//g')
TITLES=$(echo "$HTML" | grep '<img alt=\"' | sed 's/.*="//g' | sed 's/"//g')
CODES=$(echo "$HTML" | grep '"url": "/title/' | sed 's/.*title\/\([a-z0-9]*\)\/.*/\1/g')
DESCRIPTIONS=$(echo "$HTML_NO_BREAKS" | sed 's/<p class="">/\n<p class="">/g' | grep '<p class="">' | sed 's/<p class="">//g')
RATINGS=$(echo "$HTML_NO_BREAKS" | grep '<span class="certificate">' | sed 's/<span class="certificate">//g')

IFS=$'\n' read -r -d '' -a YEARS_ARRAY <<<"$YEARS"
IFS=$'\n' read -r -d '' -a IMAGES_ARRAY <<<"$IMAGES"
IFS=$'\n' read -r -d '' -a CODES_ARRAY <<<"$CODES"
IFS=$'\n' read -r -d '' -a DESCRIPTIONS_ARRAY <<<"$DESCRIPTIONS"
IFS=$'\n' read -r -d '' -a RATINGS_ARRAY <<<"$RATINGS"

index=0

rm -f public/imdb-info.tsv
echo -e "code\tyear\ttitle\tdescription\trating" >public/imdb-info.tsv

while read -r title; do
	echo ""
	echo "### $title ${CODES_ARRAY[index]} (${YEARS_ARRAY[index]})"
	echo "### ${DESCRIPTIONS_ARRAY[index]}"
	echo ""
	echo -e "${CODES_ARRAY[index]}\t${YEARS_ARRAY[index]}\t${title}\t${DESCRIPTIONS_ARRAY[index]}\t${RATINGS_ARRAY[index]}" >>public/imdb-info.tsv
	curl -o "public/posters/${CODES_ARRAY[index]}.jpg" "${IMAGES_ARRAY[index]}"
	index=$((index + 1))
done <<<"$TITLES"

# echo "${HTML//[$'\t\r\n']/}" >public/imdb-list.html
echo "$HTML_NO_BREAKS" >public/imdb-list.html
