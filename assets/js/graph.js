// === Graph Data Sets ===
// === Graph Data Sets ===
const dataSets = {
    set1: {
        nodes: new vis.DataSet([
            { id: 1, label: '藍玉', group: 'core', color: '#73d8fa' },
            { id: 2, label: '徐達', group: 'general', color: '#fa73c4' }
        ]),
        edges: new vis.DataSet([
            { from: 1, to: 2, label: '同僚' }
        ])
    },

    set2: {
        nodes: new vis.DataSet([
            { id: 3, label: '胡惟庸', group: 'accused', color: '#faa073' },
            { id: 4, label: '張三', group: 'other', color: '#cfcfcf' },
            { id: 5, label: '李四', group: 'other', color: '#cfcfcf' }
        ]),
        edges: new vis.DataSet([
            { from: 3, to: 4, label: '指控' },
            { from: 3, to: 5, label: '指控' }
        ])
    },

    set3: {
        nodes: new vis.DataSet([
            { id: 6, label: '藍玉', group: 'core', color: '#73d8fa' },
            { id: 7, label: '藍開兒', group: 'family', color: '#cfcfcf' },
            { id: 8, label: '藍太平', group: 'family', color: '#cfcfcf' }
        ]),
        edges: new vis.DataSet([
            { from: 6, to: 7, label: '父子' },
            { from: 6, to: 8, label: '父子' }
        ])
    },

    set4: {
        nodes: new vis.DataSet([
            { id: 9, label: '馬俊', group: 'accused', color: '#faa073' },
            { id: 10, label: '汪信', group: 'accused', color: '#faa073' },
            { id: 11, label: '劉真', group: 'accused', color: '#faa073' }
        ]),
        edges: new vis.DataSet([
            { from: 9, to: 10, label: '密謀' },
            { from: 10, to: 11, label: '協助' }
        ])
    },

    set5: {
        nodes: new vis.DataSet([
            { id: 12, label: '李善長', group: 'advisor', color: '#73fa9e' },
            { id: 13, label: '明太祖', group: 'emperor', color: '#faf573' },
            { id: 14, label: '胡惟庸', group: 'accused', color: '#faa073' }
        ]),
        edges: new vis.DataSet([
            { from: 12, to: 13, label: '臣子' },
            { from: 14, to: 13, label: '反叛' }
        ])
    },

    set6: {
        nodes: new vis.DataSet([
            { id: 15, label: '王誠', group: 'official', color: '#8e73fa' },
            { id: 16, label: '張政', group: 'official', color: '#8e73fa' },
            { id: 17, label: '祝哲', group: 'official', color: '#8e73fa' }
        ]),
        edges: new vis.DataSet([
            { from: 15, to: 16, label: '同僚' },
            { from: 16, to: 17, label: '推薦' }
        ])
    }
};


// === Initial Network Setup ===
let nodes = dataSets.set1.nodes;
let edges = dataSets.set1.edges;

const container = document.getElementById('network');
const options = {
    nodes: {
        shape: 'dot',
        size: 20,
        font: { size: 16 }
    },
    edges: {
        arrows: 'to',
        font: { align: 'middle' },
        color: { color: '#888' }
    },
    interaction: {
        hover: true,
        tooltipDelay: 200
    },
    physics: {
        stabilization: true
    }
};

let network = new vis.Network(container, { nodes, edges }, options);

// === Info Panel Update ===
const infoPanel = document.getElementById('infoPanel');

network.on("click", function (params) {
    if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        const node = nodes.get(nodeId);
        infoPanel.innerHTML = `
      <strong>${node.label}</strong><br>
      群組：${node.group}
    `;
    } else {
        infoPanel.innerHTML = "點選節點以顯示資訊";
    }
});

// === Graph Switching Buttons ===
document.querySelectorAll('.switch-button').forEach(button => {
    button.addEventListener('click', () => {
        const type = button.getAttribute('data-type');
        nodes = dataSets[type].nodes;
        edges = dataSets[type].edges;
        network.setData({ nodes, edges });
        infoPanel.innerHTML = '點選節點以顯示資訊';
    });
});

// === Zoom Controls ===
document.getElementById('zoomIn').addEventListener('click', () => {
    const scale = network.getScale();
    network.moveTo({ scale: scale * 1.2 });
});

document.getElementById('zoomOut').addEventListener('click', () => {
    const scale = network.getScale();
    network.moveTo({ scale: scale * 0.8 });
});
