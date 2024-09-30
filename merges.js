const arrayContainer = document.getElementById('array-container');
const numInput = document.getElementById('numInput');

// Create bars based on array values and display numbers inside them
function createBars(array) {
    arrayContainer.innerHTML = '';
    const barWidth = Math.floor(arrayContainer.clientWidth / array.length) - 2;
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value}px`;
        bar.style.width = `${barWidth}px`;

        const barText = document.createElement('span');
        barText.textContent = value;
        bar.appendChild(barText);

        arrayContainer.appendChild(bar);
    });
}

// Perform merge sort on the array
async function mergeSort(arr, left, right) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);
    await mergeSort(arr, left, mid);
    await mergeSort(arr, mid + 1, right);
    await merge(arr, left, mid, right);
}

// Merge two sorted subarrays into a single sorted array
async function merge(arr, left, mid, right) {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
        await updateBars(arr);
    }

    while (i < n1) {
        arr[k] = leftArr[i];
        i++;
        k++;
        await updateBars(arr);
    }

    while (j < n2) {
        arr[k] = rightArr[j];
        j++;
        k++;
        await updateBars(arr);
    }
}

// Update the bars in the container to reflect the current state of the array
async function updateBars(arr) {
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        bar.style.height = `${arr[index]}px`;
        const barText = bar.querySelector('span');
        if (barText) {
            barText.textContent = arr[index];
        }
    });
    await new Promise(resolve => setTimeout(resolve, 100)); // Adjust delay for visualization speed
}

// Start sorting process based on user input
function startSorting() {
    const input = numInput.value;
    const numbers = input.split(',')
                          .map(num => num.trim())
                          .filter(num => !isNaN(num) && num !== '')
                          .map(Number);

    if (numbers.length === 0) {
        alert("Please enter valid numbers.");
        return;
    }

    createBars(numbers);
    mergeSort(numbers, 0, numbers.length - 1).then(() => {
        console.log('Sorting completed.');
    });
}
