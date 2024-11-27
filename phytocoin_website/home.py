qna = {
    "hi": "Hello Vaibhav here!",
    "how are you": "I'm fine",
    "what is your name": "My name is Vaibhav",
    "how old are you": "I'm 1 day old",
}

while True:
    qs = input("Ask me a question (type 'quit' to exit): ").lower()  # Convert input to lowercase

    if qs == "quit":
        break
    elif qs in qna:
        print(qna[qs])
    else:
        print("Sorry, I don't know the answer to that question.")
