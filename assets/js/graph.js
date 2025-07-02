// Sample nodes
const nodes = new vis.DataSet([
    { id: 1, label: '藍玉', group: 'core', color: '#73d8fa' },
    { id: 2, label: '徐達', group: 'general', color: '#fa73c4' },
    { id: 3, label: '胡惟庸', group: 'accused', color: '#faa073' },
    { id: 4, label: '張三', group: 'other', color: '#cfcfcf' },
    { id: 5, label: '李四', group: 'other', color: '#cfcfcf' }
]);

// Sample edges (relationships)
const edges = new vis.DataSet([
    { from: 1, to: 2, label: '同僚' },
    { from: 1, to: 3, label: '指控' },
    { from: 2, to: 3, label: '牽連' },
    { from: 3, to: 4, label: '聯絡' },
    { from: 4, to: 5, label: '家屬' }
]);

// DOM element
const container = document.getElementById('network');

// Network options
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

// Create network
const network = new vis.Network(container, { nodes, edges }, options);

// Info panel interaction
const infoPanel = document.getElementById('infoPanel');
network.on("click", function (params) {
    if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        const node = nodes.get(nodeId);
        infoPanel.innerHTML = `<strong>${node.label}</strong><br>群組：${node.group}`;
    } else {
        infoPanel.innerHTML = "點選節點以顯示資訊";
    }
});

// Zoom control
document.getElementById('zoomIn').addEventListener('click', () => {
    const scale = network.getScale();
    network.moveTo({ scale: scale * 1.2 });
});

document.getElementById('zoomOut').addEventListener('click', () => {
    const scale = network.getScale();
    network.moveTo({ scale: scale * 0.8 });
});
