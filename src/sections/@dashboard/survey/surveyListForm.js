import PropTypes from 'prop-types';

import React, { useState } from 'react';
import {
  Box,
  TableCell,
  TableRow,
  Typography,
  IconButton,
  Collapse,
  Table,
  TableBody,
  TableHead,
  Button,
  Grid,
  Chip,
} from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { categoryList, tagList, levelList } from './constants';
// import CategoryIcon from '../../../components/category/categoryIcon';


SurveyListForm.propTypes = {
  surveyData: PropTypes.object,
  prevClick: PropTypes.func,
  modifyClick: PropTypes.func,
  setData: PropTypes.func,
};

export default function SurveyListForm({ surveyData, prevClick, modifyClick, setData}) {
  const [open, setOpen] = useState(false);

  
  return (
    <>
      {/* 이 부분은 질문의 기본 정보를 나타냅니다. */}
      <TableRow onClick={() => setOpen(!open)} sx={{ '& > *': { borderBottom: 'unset' } }}>
        
        {/* 이 부분은 자세히보기 버튼의 화살표 아이콘을 넣는 부분입니다. */}
         <TableCell> 
          <IconButton aria-label="expand row" size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell> 

        {/* 이 부분은 카테고리 태그를 나타내는 부분입니다. */}
        <TableCell style={{ width: '10%',textAlign:'center' }}>
            <Box sx={{width:'50px', ml:'10px', fontWeight:'bold', fontSize:'17px',border:'2px solid black', borderRadius: '5px'}}>{categoryList[surveyData.category]}</Box>
        </TableCell>
        <TableCell />
        
        {/* 이 부분은 질문 사항을 표시하는 부분입니다. */}
        <TableCell style={{ width: '55%', fontWeight:'bold', fontSize:'18px' }}>{surveyData.question.text}</TableCell>

        {/* 이 부분은 태그를 나타내는 부분입니다. */}
        <TableCell align="left" style={{ width: '25%' }}>
            <Chip label={tagList[surveyData.type]} />
            <Chip label={levelList[surveyData.level]} />
        </TableCell>
      </TableRow>

      {/* 이 부분은 해당 질문의 자세한 정보를 나타냅니다. */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{border:'1px solid black',  padding:'10px'}} >
                
              <Grid container spacing={0.1} mb={2}>
                  <Grid item xs={9.6}>
                  <Typography variant="h6" gutterBottom component="div">
                  상세 정보
                </Typography>
                  </Grid>
                  <Grid item xs={1.4}>
                  {/* // todo: 미리보기 버튼을 누르면 surveyData를 넘겨주며 ModalPreviewSurveySlide를 띄워줍니다. */}
                  <Button variant='outlined' sx={{ float:'right'}} onClick={()=>{prevClick(); setData(surveyData)}}>미리보기</Button>
                  </Grid>
                  <Grid item xs={1}>
                  <Button variant='outlined' sx={{ float:'right'}} onClick={()=>{modifyClick(); setData(surveyData)}}>수정하기</Button>
                  </Grid>
              </Grid>
            
              <Table size="small" aria-label="purchases" variant={'head'}>
                {/* 이 부분은 질문과 답변의 형식을 나타냅니다. */}
                <TableHead>
                  <TableRow>
                    <TableCell sx={{px:1, marginLeft:1}}>형식</TableCell>
                    <TableCell sx={{px:1}}>사진 유무</TableCell>
                    <TableCell>내용</TableCell>
                  </TableRow>
                </TableHead>

                {/* 이 부분은 질문과 답변의 내용을 나타냅니다. */}
                <TableBody>

                  {/* 이 부분은 질문의 내용을 나타냅니다. */}
                  <TableRow>
                    <TableCell>질문</TableCell>
                    <TableCell>{surveyData.question.fileUrl ? 'O': 'X'}</TableCell>
                    <TableCell>{surveyData.question.text}</TableCell>
                  </TableRow>

                  {/* 이 부분은 답변의 내용을 나타냅니다. */}
                  { surveyData.answers.map((answer, index) => (
                      <TableRow key={index}>
                        <TableCell>답변</TableCell>
                        <TableCell>{answer.fileUrl ? 'O' : 'X'}</TableCell>
                        <TableCell>{answer.text}</TableCell>
                      </TableRow>
                  ))}
                    

                </TableBody>
              </Table>
            </Box>
           
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
