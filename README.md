Docker:
    in order to run the application you must open two terminals for the backend and frontend

    frontend:
        to build: docker build -t exposure-frontend .
        to run: docker run -p 5173:5173 exposure-frontend

    backend:
        to build: docker build -t exposure-backend .
        to run: docker run -p 3000:3000 exposure-backend

    then you can open the app at http://localhost:5173/ and it should work

Github:
    https://github.com/u25054245/IMY220_Project_Nathan_Spavins