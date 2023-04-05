import MuseumIcon from '@mui/icons-material/Museum';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import ParkIcon from '@mui/icons-material/Park';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import WaterIcon from '@mui/icons-material/Water';
import PinDropIcon from '@mui/icons-material/PinDrop';

export const getIcon = (name: string): JSX.Element => {
    switch (name) {
      case 'Museum':
        return <MuseumIcon />;
      case 'Mall':
        return <StoreMallDirectoryIcon />;
      case 'Park':
        return <ParkIcon />;
      case 'Zoo':
        return <EmojiNatureIcon />
      case 'Aquarium':
        return <WaterIcon />
      default:
        return <PinDropIcon />
    }
}