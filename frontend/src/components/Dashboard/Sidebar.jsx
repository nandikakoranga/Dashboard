import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  IconButton,
  useDisclosure,
  Select,
  Divider,
  Text,
  Flex,
  Heading,
  Avatar,
  List,
  ListItem,
  ListIcon,
  useColorModeValue
} from '@chakra-ui/react';
import { ChevronRightIcon, SettingsIcon } from '@chakra-ui/icons';
import {
  MdDashboard,
  MdAssignment,
  MdSettings,
  MdExitToApp,
  MdPeople,
  MdCalendarToday,
  MdInsertDriveFile,
  MdAnalytics
} from 'react-icons/md';
import AddData from './AddData';
import { fetchData, applyFilters } from './api';

const AdminDashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedOption, setSelectedOption] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    filterData(value);
  };

  const handleApply = async (filters) => {
    try {
      console.log('Filters received in handleApply:', filters);
      const filteredData = await applyFilters(filters);
      console.log('Filtered data:', filteredData);
      setFilteredData(filteredData);
    } catch (error) {
      console.error('Error applying filters:', error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        setData(data);
        setFilteredData(data); // Initialize filtered data with all data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, []);

  const filterData = (option) => {
    if (option === '') {
      setFilteredData(data);
    } else {
      // Implement your filter logic here
      const filtered = data.filter((item) => item.category === option);
      setFilteredData(filtered);
    }
  };

  return (
    <Container>
      <AddData onApply={handleApply} />
      <IconButton
        icon={<ChevronRightIcon />}
        onClick={onOpen}
        position="fixed"
        top="50%"
        left={0}
        transform="translateY(-50%)"
        zIndex={1}
        colorScheme="teal"
        variant="outline"
      />

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg={useColorModeValue('gray.100', 'gray.800')} color={useColorModeValue('gray.800', 'white')}>
          <DrawerHeader borderBottomWidth="1px" fontSize="xl" fontWeight="bold" color="#8c2edc" display="flex" alignItems="center">
            <SettingsIcon mr={2} /> Admin Dashboard
          </DrawerHeader>
          <DrawerBody>
            <Text fontSize="lg" mb={2} fontWeight="bold">
              Menu
            </Text>
            <Divider mb={4} borderColor={useColorModeValue('gray.300', 'gray.600')} />

            <List spacing={3}>
              <ListItem cursor="pointer" color={"#11c0e4"}>
                <ListIcon as={MdDashboard} fontSize="xl" />
                Dashboard
              </ListItem>
              <ListItem cursor="pointer" color={"#11c0e4"}>
                <ListIcon as={MdAssignment} fontSize="xl" />
                Tasks
              </ListItem>
              <ListItem cursor="pointer" color={"#11c0e4"}>
                <ListIcon as={MdPeople} fontSize="xl" />
                Users
              </ListItem>
              <ListItem cursor="pointer" color={"#11c0e4"}>
                <ListIcon as={MdCalendarToday} fontSize="xl" />
                Calendar
              </ListItem>
              <ListItem cursor="pointer" color={"#11c0e4"}>
                <ListIcon as={MdInsertDriveFile} fontSize="xl" />
                Files
              </ListItem>
              <ListItem cursor="pointer" color={"#11c0e4"}>
                <ListIcon as={MdAnalytics} fontSize="xl" />
                Analytics
              </ListItem>
              <ListItem cursor="pointer" color={"#11c0e4"}>
                <ListIcon as={MdSettings} fontSize="xl" />
                Settings
              </ListItem>
              <ListItem cursor="pointer" color={"#11c0e4"} onClick={onClose}>
                <ListIcon as={MdExitToApp} fontSize="xl" />
                Logout
              </ListItem>
            </List>

            <Flex alignItems="center" mt="140%">

            </Flex>

            {/* Filter Select */}

          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  );
};

export default AdminDashboard;
