const formEl = document.querySelector('form');

document.querySelector('#getVariants').onclick = async function (e) {
    e.target.setAttribute('disabled', 'disabled');

    try {
        const res = await fetch('/task_2/variants', {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json());
        const containerEl = formEl.querySelector('div');
        containerEl.innerHTML = '';
        Object.entries(res).forEach(([key, value]) => {
            const inputEl = document.createElement('input');
            inputEl.setAttribute('type', 'radio');
            inputEl.setAttribute('name', 'vote');
            inputEl.setAttribute('id', key);
            inputEl.value = key;
            const labelEl = document.createElement('label');
            labelEl.setAttribute('for', key);
            labelEl.innerText = value;
            const wrapperEl = document.createElement('div');
            wrapperEl.append(labelEl, inputEl);
            containerEl.append(wrapperEl)
        });
        formEl.style.display = 'block';
    } catch (e) {
        console.log(e);
    } finally {
        e.target.removeAttribute('disabled');
    }
}

document.querySelector('#getVotes').onclick = async function (e) {
    e.target.setAttribute('disabled', 'disabled');
    const containerEl = document.querySelector('#votes');
    containerEl.innerHTML = '';
    try {
        const res = await fetch('/task_2/stat', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (!res.ok) {
                throw e;
            }
            return res.json();
        })
        Object.entries(res).map(([key, value]) => {
            const dtEl = document.createElement('dt');
            dtEl.innerText = key;
            const ddEl = document.createElement('dd');
            ddEl.innerText = value;
            containerEl.append(dtEl, ddEl)
        })
    } catch (e) {
        console.log(e);
    } finally {
        e.target.removeAttribute('disabled')
    }
}
