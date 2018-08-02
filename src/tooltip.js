import * as d3 from 'd3';
// import "./tooltip.css";

function floatingTooltip(tooltipId, width) {
  const tt = d3
    .select('body')
    .append('div')
    .attr('class', 'tooltip')
    .attr('id', tooltipId)
    .style('pointer-events', 'none')
    .style('position', 'absolute')
    .style('top', '100px')
    .style('left', '100px')
    .style('border', '1px solid #ccc')
    .style('background', '#fff')
    .style('color', '#485465')
    .style('padding', '10px')
    .style('width', '300px')
    .style('font-size', '14px')
    .style('z-index', '10')
    .style('max-width', '80px');

  if (width) {
    tt.style('width', '130px');
  }

  hideTooltip();
  function showTooltip(content, event) {
    tt.style('opacity', 1.0).html(content);

    updatePosition(event);
  }

  function hideTooltip() {
    tt.style('opacity', 0.0);
  }

  function updatePosition(event) {
    const xOffset = 20;
    const yOffset = 10;

    const ttw = tt.style('width');
    const tth = tt.style('height');

    const wscrY = window.scrollY;
    const wscrX = window.scrollX;

    const curX = document.all ? event.clientX + wscrX : event.pageX;
    const curY = document.all ? event.clientY + wscrY : event.pageY;
    let ttleft =
      curX - wscrX + xOffset * 2 + ttw > window.innerWidth
        ? curX - ttw - xOffset * 2
        : curX + xOffset;

    if (ttleft < wscrX + xOffset) {
      ttleft = wscrX + xOffset;
    }

    let tttop =
      curY - wscrY + yOffset * 2 + tth > window.innerHeight
        ? curY - tth - yOffset * 2
        : curY + yOffset;

    if (tttop < wscrY + yOffset) {
      tttop = curY + yOffset;
    }

    tt.style('top', `${tttop}px`).style('left', `${ttleft}px`);
  }

  return {
    showTooltip,
    hideTooltip,
    updatePosition
  };
}

const tooltip = floatingTooltip('gates_tooltip', 240);
export default tooltip;
