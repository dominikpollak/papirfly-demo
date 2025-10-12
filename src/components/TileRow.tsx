import {
  Box,
  Divider,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { Draggable } from "@hello-pangea/dnd";
import { DeleteRounded, MoreHoriz } from "@mui/icons-material";
import type { Grid } from "../types/gridTypes";
import { COLOR_OPTIONS } from "../utils/constants";
import { memo, useEffect, useState, useCallback } from "react";
import { isValidUrl } from "../utils/utils";

interface TileRowProps {
  tile: Grid;
  index: number;
  updateTile: (id: string, patch: Partial<Grid>) => void;
  deleteTile: (id: string) => void;
}

export const TileRow = memo(
  ({ tile, index, updateTile, deleteTile }: TileRowProps) => {
    const [color, setColor] = useState(tile.color);
    const [image, setImage] = useState(tile.image || "");
    const [text, setText] = useState(tile.text || "");
    const [link, setLink] = useState(tile.link || "");
    const [isLinkValid, setIsLinkValid] = useState(true);

    // local states had to be introduced to prevent list rerenders on every keystroke
    // updates of tiles now only happen after blur
    // better store setters would solve this issue
    useEffect(() => {
      setColor(tile.color);
      setImage(tile.image || "");
      setText(tile.text || "");
      setLink(tile.link || "");
    }, [tile.id, tile.color, tile.image, tile.text, tile.link]);

    const applyChanges = useCallback(() => {
      updateTile(tile.id, {
        color,
        image,
        text,
        link,
      });
    }, [tile.id, color, image, text, link, updateTile]);

    return (
      <Draggable key={tile.id} draggableId={tile.id} index={index}>
        {(prov) => (
          <div className="tileRow" ref={prov.innerRef} {...prov.draggableProps}>
            <div className="dragCol" {...prov.dragHandleProps}>
              <DragIndicatorIcon fontSize="small" />
            </div>

            <div className="bgCol">
              <Select
                size="small"
                value={color}
                onChange={(e) => setColor(e.target.value as string)}
                onBlur={applyChanges}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  "& .MuiSelect-select": { paddingLeft: 0 },
                }}
                renderValue={(selectedValue) => (
                  <div
                    className="swatch"
                    style={{ background: selectedValue as string }}
                  />
                )}
              >
                {COLOR_OPTIONS.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      className="swatch"
                      style={{ background: option.value }}
                    />
                    <span>{option.label}</span>
                  </MenuItem>
                ))}

                <Divider component="li" />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: 260,
                    padding: "0 10px",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Image URL
                  </Typography>
                  <TextField
                    size="small"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    onBlur={applyChanges}
                    fullWidth
                  />
                </Box>
              </Select>
            </div>

            <div className="textCol">
              <TextField
                size="small"
                placeholder="Tile text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={applyChanges}
                fullWidth
              />
            </div>

            <div className="linkCol">
              <TextField
                size="small"
                placeholder="Link URL"
                value={link}
                error={!isLinkValid}
                onChange={(e) => setLink(e.target.value)}
                onBlur={() => {
                  setIsLinkValid(link ? isValidUrl(link) : true);
                  applyChanges();
                }}
                fullWidth
              />
            </div>

            <div className="actionsCol">
              <Tooltip title="Delete">
                <IconButton size="small" onClick={() => deleteTile(tile.id)}>
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
    );
  }
);
