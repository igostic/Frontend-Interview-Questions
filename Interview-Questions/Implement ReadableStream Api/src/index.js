class ReadableStream {
  data = [];
  constructor(data) {
    this.data = data;
    this.pos = 0;
  }

  read(size) {
    return new Promise((resolve, reject) => {
      if (this.pos >= this.data.length) {
        resolve({ value: null, isDone: true });
      } else {
        const res = this.data.slice(this.pos, this.pos + size);
        this.pos += size;
        resolve({ value: res, isDone: false });
      }
    });
  }
}

// Example usage:
const data = [1, 2, 3, 4, 5];
const readableStream = new ReadableStream(data);

async function processData() {
  const chunkSize = 2;
  let done = false;

  while (!done) {
    const { value, isDone } = await readableStream.read(chunkSize);

    if (!isDone) {
      console.log("Received chunk:", value);
    } else {
      console.log("Stream finished.");
      done = true;
    }
  }
}

processData();
