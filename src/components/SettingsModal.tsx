import {
  Box,
  Button,
  Divider,
  MenuItem,
  Modal,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd";
import { useGridStore } from "../stores/gridStore";
import {
  Apps,
  ArrowDropDown,
  Close,
  Settings,
  SwapVert,
} from "@mui/icons-material";
import { useCallback, useState } from "react";
import type { Grid } from "../types/gridTypes";
import { COLOR_OPTIONS } from "../utils/constants";
import { updateGridData } from "../api/updateGrid";
import { TileRow } from "./TileRow";

const makeTile = (): Grid => ({
  id: `${Date.now()}-${Math.random().toString().slice(0, 9)}`,
  color: COLOR_OPTIONS[0].value,
  text: "",
  image: "",
  link: "",
});

export const SettingsModal = () => {
  const [open, setOpen] = useState(false);

  const {
    grid,
    setGrid,
    layout,
    setLayout,
    title,
    setTitle,
    setMaxRenderCount,
    maxRenderCount,
    setSubTitle,
    subTitle,
  } = useGridStore();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addTile = () => {
    const newGrid = [...grid, makeTile()];
    setGrid(newGrid);
  };

  const deleteTile = useCallback(
    (id: string) => {
      setGrid((currentGrid) => currentGrid.filter((t) => t.id !== id));
    },
    [setGrid]
  );

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return;
      setGrid((currentGrid) => {
        const items = Array.from(currentGrid);
        const [moved] = items.splice(result.source.index, 1);
        items.splice(result.destination?.index || 0, 0, moved);
        return items;
      });
    },
    [setGrid]
  );

  const updateTile = useCallback(
    (id: string, patch: Partial<Grid>) => {
      setGrid((currentGrid) =>
        currentGrid.map((t) => (t.id === id ? { ...t, ...patch } : t))
      );
    },
    [setGrid]
  );

  return (
    <>
      <button onClick={handleOpen} className="settingsBtn">
        <Settings />
      </button>

      <Modal open={open} onClose={handleClose}>
        <Box className="settingsModal">
          <button onClick={handleClose} className="closeBtn">
            <Close fontSize={"small"} />
          </button>
          {/* Left panel */}
          <aside className="settingsModal__sidebar">
            <header className="settingsModal__sidebarHeader">
              <Apps color="primary" />
              <span className="grayText">TILES</span>
            </header>

            <div className="settingsModal__section">
              <div className="selectCol">
                <span>Display</span>
                <Select
                  size="small"
                  value={layout}
                  onChange={(e) => setLayout(e.target.value)}
                  sx={{
                    width: "150px",
                  }}
                >
                  <MenuItem value="even">Even layout</MenuItem>
                  <MenuItem value="mixed">Mixed layout</MenuItem>
                </Select>
              </div>
            </div>

            <Divider />

            <div className="settingsModal__section">
              <Typography className="sectionTitle">Text</Typography>
              <div className="textFieldRow">
                <span>Title</span>
                <TextField
                  size="small"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  fullWidth
                />
              </div>
              <div className="textFieldRow">
                <span>Subtitle</span>
                <TextField
                  size="small"
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                  fullWidth
                />
              </div>
            </div>

            <Divider />

            <div className="settingsModal__section">
              <Typography className="sectionTitle">Other</Typography>

              <section>
                <div className="row">
                  <span>Load all</span>
                  <Switch
                    checked={maxRenderCount < 0}
                    onChange={(e) =>
                      setMaxRenderCount(e.target.checked ? -1 : 6)
                    }
                  />
                </div>

                {maxRenderCount !== -1 && (
                  <div className="textFieldRow row">
                    <span>Tiles visible</span>
                    <TextField
                      size="small"
                      type="number"
                      sx={{
                        width: "70px",
                      }}
                      value={maxRenderCount < 0 ? 6 : maxRenderCount}
                      onChange={(e) =>
                        setMaxRenderCount(parseInt(e.target.value))
                      }
                    />
                  </div>
                )}
              </section>
            </div>

            <Button
              onClick={updateGridData}
              className="updateBtn"
              variant="contained"
              fullWidth
            >
              Update
            </Button>
          </aside>

          {/* Right panel */}
          <div className="settingsModal__scrollWrapper">
            <section className="settingsModal__content">
              <div className="contentHeader">
                <Typography variant="subtitle2" className="grayText">
                  Tiles
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    "& .MuiButton-startIcon": {
                      marginRight: "4px",
                    },
                    width: "70px",
                    paddingLeft: "0",
                  }}
                  startIcon={<AddIcon />}
                  onClick={addTile}
                  size="small"
                >
                  Add
                </Button>
              </div>

              <section className="tilesTable">
                <div className="tilesTable__head">
                  <div className="dragCol">
                    <SwapVert />
                  </div>
                  <div className="bgCol">BG</div>
                  <div className="textCol">TEXT</div>
                  <div className="linkCol">LINK</div>
                  <div className="actionsCol">
                    <ArrowDropDown />
                  </div>
                </div>

                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="tiles-droppable">
                    {(provided) => (
                      <div
                        className="tilesTable__body"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {grid.map((tile, index) => (
                          <TileRow
                            key={tile.id}
                            tile={tile}
                            index={index}
                            updateTile={updateTile}
                            deleteTile={deleteTile}
                          />
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </section>
            </section>
          </div>
        </Box>
      </Modal>
    </>
  );
};
