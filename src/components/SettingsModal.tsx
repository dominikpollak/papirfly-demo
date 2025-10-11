import {
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import { useGridStore } from "../stores/gridStore";
import {
  Apps,
  ArrowDropDown,
  Close,
  DeleteRounded,
  MoreHoriz,
  Settings,
  SwapVert,
} from "@mui/icons-material";
import { useState } from "react";
import type { Grid } from "../types/gridTypes";
import { COLOR_OPTIONS } from "../utils/constants";

const makeTile = (): Grid => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  color: COLOR_OPTIONS[0].value,
  text: "",
  image: "",
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
  console.log(grid);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addTile = () => {
    const newGrid = [...grid, makeTile()];
    setGrid(newGrid);
  };

  const deleteTile = (id: string) => {
    setGrid(grid.filter((t) => t.id !== id));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(grid);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setGrid(items);
  };

  const updateTile = (id: string, patch: Partial<Grid>) => {
    console.log(id, patch);
    setGrid(grid.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  };

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
                  fullWidth
                  value={layout}
                  onChange={(e) => setLayout(e.target.value)}
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

            <Button className="updateBtn" variant="contained" fullWidth>
              Update
            </Button>
          </aside>

          {/* Right panel */}
          <section className="settingsModal__content">
            <div className="contentHeader">
              <Typography variant="subtitle2" className="grayText">
                Tiles
              </Typography>
              <Button
                variant="contained"
                sx={{ "& .MuiButton-startIcon": { marginRight: "4px" } }}
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
                        <Draggable
                          key={tile.id}
                          draggableId={tile.id}
                          index={index}
                        >
                          {(prov) => (
                            <div
                              className="tileRow"
                              ref={prov.innerRef}
                              {...prov.draggableProps}
                            >
                              <div
                                className="col dragCol"
                                {...prov.dragHandleProps}
                              >
                                <DragIndicatorIcon fontSize="small" />
                              </div>

                              <div className="col bgCol">
                                <Select
                                  size="small"
                                  value={tile.color}
                                  sx={{
                                    "& .MuiOutlinedInput-notchedOutline": {
                                      border: "none",
                                    },
                                    "& .MuiSelect-select": {
                                      paddingLeft: 0,
                                    },
                                  }}
                                  renderValue={(selectedValue) => (
                                    <div
                                      className="swatch"
                                      style={{
                                        background: selectedValue,
                                      }}
                                    />
                                  )}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    updateTile(tile.id, {
                                      color: e.target.value,
                                    });
                                  }}
                                >
                                  {COLOR_OPTIONS.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                      }}
                                    >
                                      <div
                                        className="swatch"
                                        style={{
                                          background: option.value,
                                        }}
                                      ></div>
                                      <span>{option.label}</span>
                                    </MenuItem>
                                  ))}
                                </Select>
                              </div>

                              <div className="col textCol">
                                <TextField
                                  size="small"
                                  placeholder="Label"
                                  value={tile.text}
                                  onChange={(e) =>
                                    setGrid(
                                      grid.map((t) =>
                                        t.id === tile.id
                                          ? { ...t, text: e.target.value }
                                          : t
                                      )
                                    )
                                  }
                                  fullWidth
                                />
                              </div>

                              <div className="col linkCol">
                                <TextField
                                  size="small"
                                  placeholder="Enter URL"
                                  value={tile.image || ""}
                                  onChange={(e) =>
                                    updateTile(tile.id, {
                                      image: e.target.value,
                                    })
                                  }
                                  fullWidth
                                />
                              </div>

                              <div className="col actionsCol">
                                <Tooltip title="Delete">
                                  <IconButton
                                    size="small"
                                    onClick={() => deleteTile(tile.id)}
                                  >
                                    <DeleteRounded />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="More">
                                  <IconButton size="small">
                                    <MoreHoriz />
                                  </IconButton>
                                </Tooltip>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </section>
          </section>
        </Box>
      </Modal>
    </>
  );
};
