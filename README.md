# JSON Server Clone

## Description

A remake of a JSON Server made by me.

## Usage

Create JSON files for each endpoint in a `db` folder. Example:

```json
[
    {
        "userId": "1",
        "id": "1",
        "title": "quidem molestiae enim"
    },
    {
        "userId": "1",
        "id": "2",
        "title": "sunt qui excepturi placeat culpa"
    },
    {
        "userId": "1",
        "id": "3",
        "title": "omnis laborum odio"
    }
]
```

## API Endpoints

- `/posts`
- `/users`
- `/albums`
- `/photos`
- `/comments`

## Routes

Based on the example `albums.json`, you'll get the following routes:

```
GET    /albums
GET    /albums/:id 
POST   /albums
PUT    /albums/:id
DELETE /albums/:id
```

## Params

### Conditions

- `==` → Equal to (` `)
- `lt` → Less than (`<`)
- `lte` → Less than or equal to (`<=`)
- `gt` → Greater than (`>`)
- `gte` → Greater than or equal to (`>=`)
- `ne` → Not equal to (`!=`)

```
GET /posts?views_gt=9000
```

### Range

- `start`
- `end`
- `limit`

```
GET /posts?_start=10&_end=20
GET /posts?_start=10&_limit=10
```

### Paginate

- `page`
- `per_page` (default = 10)

```
GET /posts?_page=1&_per_page=25
```

### Sort

- `sort=f1,f2` to sort in a descending order put a `-` before the criteria 

```
GET /posts?_sort=id,-views
```

### Filter

To filter by a key, it need to be given without `_`

```
GET /posts?title=json-server&author=typicode
GET /posts?id=1&id=2
GET /comments?author.name=typicode
```

### Full-text search

Add `q` to search an entire file

```
GET /posts?q=internet
```

### Nested and array fields

Use `.` to access deep properties

- `x.y.z...`
- `x.y.z[i]...`

```
GET /foo?a.b=bar
GET /foo?x.y_lt=100
GET /foo?arr[0]=bar
GET /foo?arr[1]_gte=10
```

### Embed

To include children or parent resources of existing relationships, add `embed`

```
GET /posts?_embed=comments
GET /comments?_embed=post
```

## Dependencies

- body-parser
- cors
- express
- pluralize

## Author and Credits

Created by Eutodot.


