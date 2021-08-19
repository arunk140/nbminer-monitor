import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';



export default function App() {
  const [endpoint, setEndpoint] = useState('192.168.2.222:8866');
  const [nb, setData] = useState({
    miner: {
      devices: [],
      total_power_consume: 0,
      total_hashrate: 0
    },
    reboot_times: 0,
    start_time: 0,
    version: "0",
    stratum: {
      accepted_shares: 0,
      algorithm: "",
      difficulty: "",
      dual_mine: false,
      invalid_shares: 0,
      latency: 0,
      pool_hashrate_4h: "-",
      pool_hashrate_10m: "-",
      pool_hashrate_24h: "-",
      rejected_shares: 0,
      url: "0",
      use_ssl: false,
      user: "",
    }
  });
  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem('@nbminer_endpoint', value)
    } catch (e) {
      // saving error
    }
  }
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@nbminer_endpoint')
      if (jsonValue !== null || jsonValue !== undefined) {
        setEndpoint(jsonValue);
      }
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  }
  function updateEndpoint(endpoint: any) {
    storeData(endpoint);
    getData();
  }
  function makeAPIRequest() {
    fetch(`http://${endpoint}/api/v1/status`, {
      method: 'GET'
    }).then((response) => response.json())
      .then((json) => {
        setData(json);
        return json.miner;
      }).catch((error) => {
        alert(error);
      });
  }
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={updateEndpoint}
        value={endpoint}
        placeholder="0.0.0.0:8888"
      />
      <Text>NBMiner v{nb.version}</Text>
      <Text>No. of Devices - {nb.miner.devices.length}</Text>
      <Text>Reboot Times - {nb.reboot_times}</Text>
      <Text>Start Time - {nb.start_time}</Text>
      <Text>Total Power Consumption - {nb.miner.total_power_consume}</Text>
      <Text>Total Hashrate - {nb.miner.total_hashrate}</Text>
      <Text>Accepted Shares - {nb.stratum.accepted_shares}</Text>
      <Text>Rejected Shares - {nb.stratum.rejected_shares}</Text>
      <Text>Algorithm - {nb.stratum.algorithm}</Text>
      <Text></Text>
      <StatusBar style="auto" />
      <Button onPress={makeAPIRequest} title="Refresh"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
