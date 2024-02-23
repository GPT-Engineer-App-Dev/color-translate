import React, { useState } from "react";
import { Box, Input, Button, Text, VStack, useToast, Spinner } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const Index = () => {
  const [hexCode, setHexCode] = useState("");
  const [colorName, setColorName] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const fetchColorName = async () => {
    setLoading(true);
    setColorName(""); // Reset color name while fetching

    try {
      const response = await fetch(`https://api.color.pizza/v1/${hexCode}`);
      const data = await response.json();

      if (response.ok) {
        const color = data.colors[0];
        setColorName(color.name);
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to fetch color name",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack spacing={4} align="stretch" m={8}>
      <Text fontSize="2xl" fontWeight="bold" textAlign="center">
        Hex Code to Color Name Converter
      </Text>
      <Box display="flex" alignItems="center">
        <Input placeholder="Enter hex code without #" value={hexCode} onChange={(e) => setHexCode(e.target.value)} isInvalid={hexCode.length > 0 && !/^[0-9A-Fa-f]{6}$/.test(hexCode)} errorBorderColor="crimson" />
        <Button leftIcon={<FaSearch />} colorScheme="teal" ml={2} onClick={fetchColorName} isDisabled={!/^[0-9A-Fa-f]{6}$/.test(hexCode)} isLoading={loading}>
          Translate
        </Button>
      </Box>
      {loading ? (
        <Spinner />
      ) : (
        colorName && (
          <Box p={4} borderWidth="1px" borderRadius="lg">
            <Text fontSize="lg">Color Name: {colorName}</Text>
          </Box>
        )
      )}
    </VStack>
  );
};

export default Index;
