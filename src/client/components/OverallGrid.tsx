import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export interface GridProps {
    row: number,
    col: number,
    columnTitles: string[],
    rowTitles: string[],
    maxWidth?: string,
    maxHeight?: string | number
}



function OverallGrid(
    {row, col, columnTitles, rowTitles, maxWidth,
    maxHeight = "100vh"
    }: GridProps
) {
    const heightLimit = typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight;
    const widthLimits = ['100%', `calc(${heightLimit} * ${col} / ${row})`];
    if (maxWidth) widthLimits.push(maxWidth);
    const fittedWidth = `min(${widthLimits.join(', ')})`;

    const getContent = (r: number, c: number) => {
        if (r == 0 && c == 0) return null
        if (r == 0) return columnTitles[c - 1] ?? ""
        if (c == 0) return rowTitles[r - 1] ?? ""

        return null
    }

    const cells: React.ReactElement[] = [];
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            const isCorner = (r === 0 && c === 0);
            const isHeader = ((r === 0 || c === 0) && !isCorner);
            const content = getContent(r, c);

        cells.push(
            // size={1} out of `colCount` columns => every cell is exactly 1/colCount wide.
            <Grid
            key={`${r}-${c}`}
            size={1}
            role={isHeader ? (r === 0 ? 'columnheader' : 'rowheader') : (isCorner ? 'corner': 'cell')}
            sx={{
                aspectRatio: '1 / 1', // height always matches width => square
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 0, // lets long text truncate instead of stretching the cell
                p: 0.5,
                overflow: 'hidden',
                border: isCorner ? 0: 1,
                borderColor: 'divider',
                bgcolor: isHeader ? 'red' : (isCorner ? 'transparent' : 'white'),
            }}
            >
            {typeof content === 'string' ? (
                <Typography
                variant="body2"
                title={content}
                noWrap
                sx={{ fontWeight: isHeader ? 600 : 400, maxWidth: '100%' }}
                >
                {content}
                </Typography>
            ) : (
                content
            )}
            </Grid>,
        );
    }

    console.log(cells)
  }

    return (
        <Box sx={{
            width: fittedWidth, mx: 'auto'
            }}>
      <Grid
        container
        columns={col} // overrides the default 12 columns
        role="table"
        sx={{boxSizing: "border-box"}}
      >
        {cells}
      </Grid>
    </Box>
    )
}

export default OverallGrid