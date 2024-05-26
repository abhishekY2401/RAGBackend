# Project Flow

## Features

### project creation
- When a user creates a new project, trigger the insert project query which will take following params (title, description)

### upload pdf in a specific project
- Upload the pdf to a hosted file storage system (for ex - S3)
- send the document for creation of vector embeddings using any LLM API
- store the signed pdf url and embeddings into database (Postgres)

### RAG process
- When a user enters a query in a specific project, create a vector embedding of that query.
- Now, this is where actual magic happens, compare the embeddings with the existing embeddings from the uploaded pdf and fetch relevant response to it
- Once the response is generated, store the query, query embeddings and response in database.
