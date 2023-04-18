import MuseumIcon from '@mui/icons-material/Museum';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import ParkIcon from '@mui/icons-material/Park';
import ChurchIcon from '@mui/icons-material/Church';
import TheatersIcon from '@mui/icons-material/Theaters';
import PinDropIcon from '@mui/icons-material/PinDrop';

export const getIcon = (name: string): JSX.Element => {
    switch (name) {
      case 'Museum':
        return <MuseumIcon />;
      case 'Shop':
        return <StoreMallDirectoryIcon />;
      case 'Park':
        return <ParkIcon />;
      case 'Memorial':
        return <ChurchIcon />
      case 'Entertainment':
        return <TheatersIcon />
      default:
        return <PinDropIcon />
    }
}