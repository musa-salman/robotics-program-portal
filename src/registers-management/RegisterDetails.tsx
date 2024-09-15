import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Register } from '../register/Register';
import { hearAboutUsOptions, mathUnits, studyUnitsMajorOptions } from '../register/info';
import { Student } from '../students-management/Student';
import { hasOwn } from 'groq-sdk/core.mjs';
import { useEffect, useState } from 'react';
import { StudentDocument } from '../docs-handling/service/StudentDocument';
import { DocumentInfo } from '../docs-handling/service/DocumentInfo';
import { Delete, Download } from '@mui/icons-material';
import { useDocumentInfoService } from '../docs-handling/service/useDocumentInfoService';

/**
 * Represents the props for the Details component.
 *
 * @remarks
 * This component is used to display the details of a registration data or a student.
 */
interface DetailsProps {
  registrationData: Register | Student;
  onClose: () => void;
}

/**
 * Renders the details of a student registration.
 *
 * @component
 * @param {DetailsProps} props - The component props.
 * @param {RegistrationData} props.registrationData - The registration data.
 * @param {Function} props.onClose - The function to close the details.
 * @returns {JSX.Element} The rendered component.
 */
const StudentDetails: React.FC<DetailsProps> = ({ registrationData, onClose }) => {
  const [open, setOpen] = useState(false);
  const [documents, setDocuments] = useState<StudentDocument[] | null>(null);
  const isRegister = hasOwn(registrationData, 'hearAboutUs');

  const documentService = useDocumentInfoService();

  console.log(documents);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Downloads a student document.
   *
   * @param document - The student document to download.
   */
  const handleDownload = (document: StudentDocument) => {
    documentService.downloadStudentDocument(registrationData.id, {
      id: document.documentId,
      documentName: document.documentName,
      description: '',
      filename: document.filename,
      name: document.documentName
    } as DocumentInfo);
  };

  /**
   * Deletes a student document.
   *
   * @param document - The document to be deleted.
   */
  const handleDelete = (document: StudentDocument) => {
    documentService.deleteStudentDocument(registrationData.id, document.documentId).then(() => {
      setDocuments((prev) => prev!.filter((doc) => doc.documentId !== document.documentId));
    });
  };

  useEffect(() => {
    if (!documents) {
      documentService
        .getStudentDocumentRepository(registrationData.id)
        .find()
        .then((docs) => {
          setDocuments(docs);
        });
    }
  }, [documents]);

  return (
    <Card sx={{ margin: 2, padding: 2 }}>
      <CardHeader
        action={
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        }
        title="פרטי הרשמה"
        titleTypographyProps={{ variant: 'h5', color: 'primary' }}
      />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6" color="textPrimary">
              שם תלמיד: {registrationData.firstName} {registrationData.lastName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              תעודת זהות: {registrationData.studentId}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              כתובת: {registrationData.studentAddress}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              טלפון תלמיד: {registrationData.studentPhoneNumber}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              אימייל תלמיד: {registrationData.studentEmail}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              טלפון הורה: {registrationData.parentPhoneNumber}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              אימייל הורה: {registrationData.parentEmail}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              בית ספר: {registrationData.studentSchool}
            </Typography>
          </Grid>
          {!isRegister && (
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleOpen}>
                הצג מסמכים
              </Button>
            </Grid>
          )}
          {isRegister && (
            <>
              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary">
                  מגמת לימודים: {studyUnitsMajorOptions[Number((registrationData as Register).studyUnitsMajor)]}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary">
                  מספר יחידות במתמטיקה: {mathUnits[Number((registrationData as Register).numStudyUnitsMath)]}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary">
                  איך שמעת עלינו: {hearAboutUsOptions[Number((registrationData as Register).hearAboutUs)]}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" color="textSecondary">
                  שאלות נוספות: {(registrationData as Register).otherQuestions}
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>מסמכי תלמיד</DialogTitle>
        <DialogContent>
          <List>
            {documents !== null && documents.length > 0 ? (
              (documents || []).map((document, index) => (
                <ListItem key={index} divider>
                  <ListItemText primary={document.documentName} />
                  <Box display="flex" alignItems="center">
                    <IconButton edge="end" color="default" onClick={() => handleDelete(document)} aria-label="delete">
                      <Delete />
                    </IconButton>
                    <Box ml={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Download />}
                        onClick={() => handleDownload(document)}>
                        הורד
                      </Button>
                    </Box>
                  </Box>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="אין מסמכים להצגה" />
              </ListItem>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            סגור
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default StudentDetails;
