import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { User } from '../../types/dashboard';

interface ExportUsersModalProps {
  isVisible: boolean;
  onClose: () => void;
  users: User[];
}

 const ExportUsersModal: React.FC<ExportUsersModalProps> = ({
  isVisible,
  onClose,
  users,
}) => {
  const [exportStartDate, setExportStartDate] = useState(new Date());
  const [exportEndDate, setExportEndDate] = useState(new Date());

  const handleExportUsers = async () => {
    const filteredForExport = users.filter(user => {
      const userDate = new Date(user.registrationDate);
      return userDate >= exportStartDate && userDate <= exportEndDate;
    });

    const htmlContent = `
      <html>
        <body>
          <h1>Exported Users</h1>
          <table>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Registration Date</th>
            </tr>
            ${filteredForExport.map(user => `
              <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>${user.status}</td>
                <td>${user.registrationDate}</td>
              </tr>
            `).join('')}
          </table>
        </body>
      </html>
    `;

    try {
      const options = {
        html: htmlContent,
        fileName: 'ExportedUsers',
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);
      console.log('PDF generated:', file.filePath);
      // You can add logic here to share or open the generated PDF
    } catch (error) {
      console.error('Error generating PDF:', error);
    }

    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Export Users</Text>
          <Text>Start Date:</Text>
          <DateTimePicker
            value={exportStartDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || exportStartDate;
              setExportStartDate(currentDate);
            }}
          />
          <Text>End Date:</Text>
          <DateTimePicker
            value={exportEndDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || exportEndDate;
              setExportEndDate(currentDate);
            }}
          />
          <TouchableOpacity
            style={styles.modalButton}
            onPress={handleExportUsers}
          >
            <Text style={styles.modalButtonText}>Export to PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={onClose}
          >
            <Text style={styles.modalButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  cancelButton: {
    backgroundColor: '#ef4444',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
});

export {ExportUsersModal};