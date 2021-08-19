import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';



export default function App() {
  const [nb, setData] = useState({
    miner: {
      devices: [],
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
  function makeAPIRequest() {
    fetch('http://192.168.2.222:8866/api/v1/status', {
      method: 'GET'
    }).then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json);
        return json.miner;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <View style={styles.container}>
      <Text>NBMiner v{nb.version}</Text>
      <Text>No. of Devices - {nb.miner.devices.length}</Text>
      <Text>Reboot Times - {nb.reboot_times}</Text>
      <Text>Start Time - {nb.start_time}</Text>
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
