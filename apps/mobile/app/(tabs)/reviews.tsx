import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { Shield, Sparkles } from 'lucide-react-native';

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  replyText: string | null;
}

export default function MobileReviews() {
  const [reviews, setReviews] = useState<Review[]>([
    { id: '1', author: 'Aarav Mehta', rating: 5, comment: 'Excellent customer service! The sliding glass frames are ultra premium. Highly recommended.', sentiment: 'POSITIVE', replyText: null },
    { id: '2', author: 'Vikram Singh', rating: 2, comment: 'The installation was delayed by 3 days. The frames look fine, but execution speed was poor.', sentiment: 'NEGATIVE', replyText: null },
    { id: '3', author: 'Pooja Hegde', rating: 4, comment: 'Good durability and thin borders. Value pricing is fair.', sentiment: 'POSITIVE', replyText: 'Hi Pooja, thank you! We appreciate your business.' },
  ]);

  const [draftReplies, setDraftReplies] = useState<{ [id: string]: string }>({});
  const [loadingMap, setLoadingMap] = useState<{ [id: string]: boolean }>({});

  const handleGenerateReply = (id: string, author: string, rating: number) => {
    setLoadingMap(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      let response = '';
      if (rating >= 4) {
        response = `Dear ${author},\n\nThank you for the review! We are delighted to hear you liked our premium glass frames. We look forward to serving you again!\n\nBest,\nForscha AI`;
      } else {
        response = `Dear ${author},\n\nWe apologize for the installation delay. We take speed seriously. Please reach out to support@forscha.com so we can address your concerns immediately.\n\nWarm regards,\nCustomer Relations`;
      }
      setDraftReplies(prev => ({ ...prev, [id]: response }));
      setLoadingMap(prev => ({ ...prev, [id]: false }));
    }, 800);
  };

  const handlePostReply = (id: string) => {
    const text = draftReplies[id];
    if (!text) return;
    setReviews(prev => prev.map(r => r.id === id ? { ...r, replyText: text } : r));
    setDraftReplies(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    Alert.alert('Posted Successfully', 'AI review reply has been pushed live to Google Business Profile.');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.statsCard}>
        <Text style={styles.statsHeader}>AI Sentiment Ratio</Text>
        <Text style={styles.statsSub}>88% Positive • 12% Attention Needed</Text>
      </View>

      <Text style={styles.sectionTitle}>Reviews Queue</Text>
      
      {reviews.map(rev => (
        <View key={rev.id} style={[styles.reviewCard, rev.sentiment === 'NEGATIVE' ? styles.cardBorderAlert : styles.cardBorderDefault]}>
          <View style={styles.reviewHeader}>
            <View>
              <Text style={styles.author}>{rev.author}</Text>
              <Text style={styles.stars}>{'★'.repeat(rev.rating)}</Text>
            </View>
            <View style={[styles.sentimentBadge, rev.sentiment === 'POSITIVE' ? styles.badgeSuccess : styles.badgeAlert]}>
              <Text style={styles.badgeText}>{rev.sentiment}</Text>
            </View>
          </View>

          <Text style={styles.comment}>{rev.comment}</Text>

          {rev.replyText ? (
            <View style={styles.replyBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <Shield size={12} color="#3E6BEC" />
                <Text style={styles.replyTitle}>Your Live Reply</Text>
              </View>
              <Text style={styles.replyBody}>{rev.replyText}</Text>
            </View>
          ) : (
            <View style={styles.actionsBlock}>
              {!draftReplies[rev.id] ? (
                <TouchableOpacity 
                  style={styles.actionBtn} 
                  disabled={loadingMap[rev.id]}
                  onPress={() => handleGenerateReply(rev.id, rev.author, rev.rating)}
                >
                  {loadingMap[rev.id] ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                      <Sparkles size={13} color="#FFFFFF" />
                      <Text style={styles.actionBtnText}>Draft Reply with AI</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ) : (
                <View style={styles.draftContainer}>
                  <Text style={styles.label}>AI Draft Response:</Text>
                  <TextInput
                    style={styles.input}
                    multiline
                    value={draftReplies[rev.id]}
                    onChangeText={(val) => setDraftReplies(prev => ({ ...prev, [rev.id]: val }))}
                  />
                  <View style={styles.row}>
                    <TouchableOpacity style={styles.postBtn} onPress={() => handlePostReply(rev.id)}>
                      <Text style={styles.postBtnText}>Send to Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.cancelBtn} 
                      onPress={() => setDraftReplies(prev => {
                        const copy = { ...prev };
                        delete copy[rev.id];
                        return copy;
                      })}
                    >
                      <Text style={styles.cancelBtnText}>Discard</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070709',
    padding: 16,
  },
  statsCard: {
    backgroundColor: '#151430',
    borderColor: '#262254',
    borderWidth: 1,
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  statsHeader: {
    fontSize: 16,
    fontWeight: '800',
    color: '#818CF8',
  },
  statsSub: {
    fontSize: 13,
    color: '#A5B4FC',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  reviewCard: {
    backgroundColor: '#0F0F12',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  cardBorderDefault: {
    borderColor: '#202025',
  },
  cardBorderAlert: {
    borderColor: '#7F1D1D',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  author: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  stars: {
    fontSize: 12,
    color: '#F59E0B',
    marginTop: 2,
  },
  sentimentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeSuccess: {
    backgroundColor: '#064E3B',
  },
  badgeAlert: {
    backgroundColor: '#7F1D1D',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  comment: {
    fontSize: 13,
    color: '#D1D5DB',
    lineHeight: 18,
    marginBottom: 14,
  },
  replyBox: {
    backgroundColor: '#16161A',
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#3E6BEC',
  },
  replyTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#3E6BEC',
  },
  replyBody: {
    fontSize: 12,
    color: '#E5E7EB',
    lineHeight: 16,
  },
  actionsBlock: {
    marginTop: 4,
  },
  actionBtn: {
    backgroundColor: '#16161A',
    borderColor: '#202025',
    borderWidth: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  draftContainer: {
    backgroundColor: '#16161A',
    borderColor: '#202025',
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
  },
  label: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#070709',
    borderColor: '#202025',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    color: '#FFFFFF',
    fontSize: 12,
    textAlignVertical: 'top',
    height: 80,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  postBtn: {
    backgroundColor: '#10B981',
    flex: 2,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  postBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  cancelBtn: {
    backgroundColor: '#202025',
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
