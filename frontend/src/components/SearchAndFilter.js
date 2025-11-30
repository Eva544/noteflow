import { Box, TextField } from "@mui/material";

const SearchAndFilter = ({ search, setSearch }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        width: "100%",
        maxWidth: 500,
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
      />
    </Box>
  );
};

export default SearchAndFilter;
