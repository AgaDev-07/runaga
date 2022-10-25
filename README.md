# RunAga
## Examples in console

```
npx runaga index.js
```
```
npx runaga index.js --ignore data.json db.json
```
```
npx runaga index.js --exclude node_modules bin
```
```
npx runaga index.js --extension js json
```

## Example in runaga.json
```json
{
  "file": "index.js",
  "ignore": [ "data.json", "db.json" ],
  "extensions": [ "js", "json" ],
  "exclude": [ "node_modules", "lib" ]
}
```
```
npx runaga
```