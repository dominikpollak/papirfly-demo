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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import { useGridStore } from "../stores/gridStore";
import {
  Close,
  DeleteForever,
  DeleteRounded,
  MoreHoriz,
  Settings,
} from "@mui/icons-material";
import { useState } from "react";
import type { Grid } from "../types/gridTypes";
import { COLOR_OPTIONS } from "../constants/constants";

const makeTile = (): Grid => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  color: "blue",
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addTile = () => {
    const next = [...grid, makeTile()];
    setGrid(next);
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
          {/* Left panel */}
          <aside className="settingsModal__sidebar">
            <header className="settingsModal__sidebarHeader">
              <div className="dotGrid" />
              <Typography variant="subtitle2">TILES</Typography>
            </header>

            <div className="settingsModal__section">
              <Typography className="label">Display</Typography>
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

            <Divider />

            <div className="settingsModal__section">
              <Typography className="sectionTitle">Text</Typography>
              <TextField
                label="Title"
                size="small"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
              />
              <TextField
                label="Subtitle"
                size="small"
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
                fullWidth
                sx={{ mt: 1 }}
              />
            </div>

            <Divider />

            <div className="settingsModal__section">
              <Typography className="sectionTitle">Other</Typography>

              <div className="row">
                <Typography>Load all</Typography>
                <Switch
                  checked={maxRenderCount < 0}
                  onChange={(e) =>
                    setMaxRenderCount(e.target.checked ? -1 : 20)
                  }
                />
              </div>

              {maxRenderCount !== -1 && (
                <TextField
                  label="Tiles visible"
                  size="small"
                  type="number"
                  value={maxRenderCount < 0 ? 20 : maxRenderCount}
                  onChange={(e) =>
                    setMaxRenderCount(parseInt(e.target.value || "0", 10))
                  }
                  fullWidth
                />
              )}
            </div>

            <Button className="updateBtn" variant="contained" fullWidth>
              Update
            </Button>
          </aside>

          {/* Right panel */}
          <section className="settingsModal__content">
            <button onClick={handleClose} className="closeBtn">
              <Close
                fontSize={"small"}
                sx={{
                  strokeWidth: 8,
                }}
              />
            </button>
            <div className="contentHeader">
              <Typography variant="subtitle1" className="grayText">
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
                <div className="col dragCol" />
                <div className="col bgCol">BG</div>
                <div className="col textCol">TEXT</div>
                <div className="col linkCol">LINK</div>
                <div className="col actionsCol" />
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
                                  }}
                                  renderValue={(selectedValue) => (
                                    <div
                                      className="swatch"
                                      style={{
                                        backgroundColor: selectedValue,
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
                                          backgroundColor: option.value,
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
